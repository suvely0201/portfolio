package jj.group.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching // Cache 사용하겠다 선언
@SpringBootApplication
public class PortfolioApplication extends SpringBootServletInitializer {
	
	public static void main(String[] args) {
		
		System.setProperty("server.servlet.context-path", "/");
		SpringApplication.run(PortfolioApplication.class, args);
		
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(PortfolioApplication.class);
	}
	
}