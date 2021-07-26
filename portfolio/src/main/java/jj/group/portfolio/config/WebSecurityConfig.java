package jj.group.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsUtils;

@Configuration
@EnableWebSecurity
@EnableGlobalAuthentication
@EnableGlobalMethodSecurity(securedEnabled=true, prePostEnabled=true, jsr250Enabled=true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
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
		
		// 인증되지 않은 사용자는 허용하지 않겠다.
		// 해당 코드는 모든 페이지를 일반 사용자에게 오프하지 않을 경우에 추가하면 좋다.
		// 나는 특정 페이지는 일반사용자에게 오픈 / 또 다른 페이지는 오픈하지 않을 것이기 때문에 주석처리.
		/*http
			.anonymous()
				.disable();*/
		
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
			.and()
			.authorizeRequests()
				// CorsUtil PreFlight 요청은 인증처리 하지 않겠다는 의미
				// CorsUtil PreFlight에는 Authorization 헤더를 줄 수 없으므로 401 응답을 해선안된다. 
				.requestMatchers(CorsUtils::isPreFlightRequest)
					.permitAll()
				.antMatchers(
					"/gallery/**"
				)
					.permitAll()
				.anyRequest()
					.authenticated();
					// .permitAll();
		
		/*
		http
			.sessionManagement()
			.maximumSessions(1) // session 허용 갯수
			.maxSessionsPreventsLogin(false) // true = 동일 사용자가 로그인 한 경우 로그인 안된다. false = 동일 사용자 로그인 한 경우 기존 사용자 접속 종료
			.expiredUrl("/") // 중복 로그인이 일어났을 경우 이동할 페이지
			.sessionRegistry(sessionRsegistry());
		*/
    }
	
	// session control
	/*
	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}
	*/
	
}
