package jj.group.portfolio.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jj.group.portfolio.filter.AccessDeniedFilter;
import jj.group.portfolio.filter.AuthenticationEntryPointFilter;
import jj.group.portfolio.filter.AuthenticationFilter;
import jj.group.portfolio.util.AuthFailureUtil;
import jj.group.portfolio.util.AuthSuccessUtil;

@Configuration
@EnableWebSecurity
@EnableGlobalAuthentication
// @Secured 사용하려고 securedEnabled 추가함
// @Secured = 특정권한을 가진 사람만 들어갈 수 있도록 Controller에 추가할 수 있음.
@EnableGlobalMethodSecurity(securedEnabled=true, prePostEnabled=true, jsr250Enabled=true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	// 커스텀인증
	@Autowired
	private AuthenticationFilter authProvider;

	// 인증이 되지 않은 유저가 요청했을 때 동작
	@Autowired
	private AuthenticationEntryPointFilter authenticationEntryPoint;
	
	// 서버에 요청할 때 access가 가능한지 권한을 체크한 후 access할 수 없을 때 동작
	@Autowired
	private AccessDeniedFilter accessDeniedHandler;
	
	
	// security가 무시하는 부분
	@Override
	public void configure(WebSecurity web) {
		
		web
			.ignoring()
				.antMatchers("/resources/**");
		
	}
	
	// security 접근 권한
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		
		// 외부에서 우리 링크를 호출하는 것을 허용하느냐 허용하지 않느냐.
		// iframe등 같은 링크내에서는 호출 가능.
		http
			.headers()
				.frameOptions()
					.sameOrigin();
		
		http
			.cors() // 인증성공 여부와 무관하게 origin 헤더가 있는 모든 요청에 대해 CORS 헤더를 포함한 응답을 해준다.
			.and()
			.csrf()
				// GET 호출 시 XSRF-TOKEN 쿠키 생성 x
				// disable하면 authenticationProvider를 태우고, 쿠키생성 o
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
				//.disable();
		
		http
			.formLogin()
				.loginPage("/login")
					.loginProcessingUrl("/loginproc")
						.successHandler(authSuccessUtil())
						.failureHandler(authFailureUtil())
			.and()
				.logout()
					.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
					.deleteCookies("cookieName")
					.clearAuthentication(true)
					.invalidateHttpSession(true)
					.logoutSuccessUrl("/")
			.and()
			.authorizeRequests()
				// CorsUtil PreFlight 요청은 인증처리 하지 않겠다는 의미
				// CorsUtil PreFlight에는 Authorization 헤더를 줄 수 없으므로 401 응답을 해선안된다. 
				.requestMatchers(CorsUtils::isPreFlightRequest)
					.permitAll()
				// 로그인페이지는 인증되지 않은 사용자만
				.antMatchers("/login")
					.hasRole("ANONYMOUS")
				// 갤러리는 인증되지 않은 사용자 + GUEST_임시
				.antMatchers("/gallery/**")
					.hasAnyRole("ANONYMOUS", "GUEST")
				.antMatchers("/loginproc")
					.permitAll()
				// 나머지 숨기기
				.anyRequest()
					.authenticated();
		
		http
			.sessionManagement()
			.maximumSessions(1) // session 허용 갯수
			.maxSessionsPreventsLogin(false) // true = 동일 사용자가 로그인 한 경우 로그인 안된다. false = 동일 사용자 로그인 한 경우 기존 사용자 접속 종료
			.expiredUrl("/") // 중복 로그인이 일어났을 경우 이동할 페이지
			.sessionRegistry(sessionRegistry());
		
		http
			.exceptionHandling()
//			.authenticationEntryPoint(authenticationEntryPoint) // 인증이 되지 않은 유저가 요청했을 때 동작
			.accessDeniedHandler(accessDeniedHandler); // 서버에 요청할 때 access가 가능한지 권한을 체크한 후 access할 수 없을 때 동작

    }
	
	// session control
	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}
	
	// 커스텀 인증
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
		auth
			.authenticationProvider(authProvider);
		
	}
		
	// 비밀번호 암호화 ( 단방향 복호화 불가능 )
	@Bean
	public PasswordEncoder encoder() {
		
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
		
	}
	// security success handler
	@Bean
	public AuthenticationSuccessHandler authSuccessUtil() {
		return new AuthSuccessUtil();
	}
	
	// security failure handler
	@Bean
	public AuthenticationFailureHandler authFailureUtil() {
		return new AuthFailureUtil();
	}
	
	// CORS 정책 수립
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		
		CorsConfiguration corsConfig = new CorsConfiguration();
		
		// http://localhost:8081 으로 오는 것을 허용 이거 추가해주면 다른데서 gdms접근가능
		corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:8080"));
		
		corsConfig.setAllowCredentials(true);
		corsConfig.setAllowedHeaders(Arrays.asList("Content-Type", "X-XSRF-TOKEN", "Authorization", "Content-Length", "X-Requested-With")); // Header
		corsConfig.setAllowedMethods(Arrays.asList("*")); // GET, POST 같은 것
		corsConfig.setMaxAge(3600L);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfig);
		
		return source;
		
	}
	
}
