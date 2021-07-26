package jj.group.portfolio.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Bean
	public ViewResolver viewResolver() {
		
		InternalResourceViewResolver vr = new InternalResourceViewResolver();
		vr.setPrefix("/WEB-INF/views/");
		vr.setSuffix(".jsp");
		
		return vr;
		
	}
	
	@Bean
	public MessageSource messageSource() {
		
		ReloadableResourceBundleMessageSource ms = new ReloadableResourceBundleMessageSource();
		ms.setBasename("classpath:/messages/message");
		ms.setDefaultEncoding("UTF-8");
		
		return ms;
		
	}
	
	@Bean
	public SessionLocaleResolver localeResolver() {
		
		SessionLocaleResolver slr = new SessionLocaleResolver();
		return slr;
		
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		registry
			.addResourceHandler("/resources/**")
			.addResourceLocations("/resources/");
		
	}
	
	/*
	* 필요시 인터셉터 추가
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		registry
			.addInterceptor(new MainInterceptor())
			.addPathPatterns("/loginproc");
		
		registry
			.addInterceptor(new AuthInterceptor(loginService))
			.addPathPatterns("/**")
			
			.excludePathPatterns("/loginproc")
			.excludePathPatterns("/idcheck")
			.excludePathPatterns("/btp")
			.excludePathPatterns("/rtp")
			.excludePathPatterns("/thumbs")
			.excludePathPatterns("/no-session")
			.excludePathPatterns("/no-auth")
			.excludePathPatterns("/resources/**");
		
		LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
		localeChangeInterceptor.setParamName("lang");
		registry.addInterceptor(localeChangeInterceptor);
		
	}
	*/
}
