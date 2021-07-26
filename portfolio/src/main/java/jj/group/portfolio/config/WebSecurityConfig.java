package jj.group.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

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
	
	// security권한
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		/*
		// 외부에서 우리 링크 호출하는 것을 허용하느냐, 허용하지 않느냐
		// iframe등 프로젝트내에서 호출 가능. 다른 외부에서 링크호출 불가능
		http
			.headers()
				.frameOptions()
					.sameOrigin(); // 사용안해도 뭐.. 상관없을 듯 ? ( deny )
		
		*/
		
		http
			//.cors() // 인증성공 여부와 관계없이 origin 헤더가 있는 모든 요청에 대해 cors 헤더를 포함한 응답을 해준다.
			//.and()
			.csrf()
				// authenticationProvider 못타고있음.
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
		
		http
			.formLogin()
				.loginPage("/login")
					.defaultSuccessUrl("/")
			.and()
			.authorizeRequests()
			// CorsUtil PreFlight 요청은 인증처리 하지 않겠다는 의미
			// CorsUtil PreFlight에는 Authorization 헤더를 줄 수 없으므로 401 응답을 해선안된다.
//			.requestMatchers(CorsUtils::isPreFlightRequest)
//			.permitAll() 
				.anyRequest()
					.permitAll();
		http
			.sessionManagement()
			.maximumSessions(1) // session 허용 갯수
			.maxSessionsPreventsLogin(false) // true = 동일 사용자가 로그인 한 경우 로그인 안된다. false = 동일 사용자 로그인 한 경우 기존 사용자 접속 종료
			.expiredUrl("/") // 중복 로그인이 일어났을 경우 이동할 페이지
			.sessionRegistry(sessionRegistry());
			
	}
	
	// session control
	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}
	
}
