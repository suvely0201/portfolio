package jj.group.portfolio.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class AuthFailureUtil implements AuthenticationFailureHandler {
	
	// axios에서 넘어와서 redirect 해주지 못하기 때문에 주석처리
	// private final String DEFAULT_FAILURE_URL = "/login";
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
		
		String erMsg = new String();
		
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		
		if(exception instanceof UsernameNotFoundException) {
			
			// 단순 String 으로 해도 상관없음.
			// 단순 String일 경우 html response data안에 들어감.
			// obj일 경우 data안에 map형식이 들어가는 형태.
			erMsg = 
					StringUtils.join(new String[] {
							"{\"_auth_\": {",
								"\"_authCode\":\"auth_04\",",
								"\"_authMessage\":\"Does not exist ID.\"",
							"}}"
					});
			
		} else if (exception instanceof BadCredentialsException) {
			
			erMsg = 
					StringUtils.join(new String[] {
							"{\"_auth_\": {",
								"\"_authCode\":\"auth_04\",",
								"\"_authMessage\":\"Does not match Password.\"",
							"}}"
					});
			
		}
		
		// react가 아닌 일반 jsp로 에러메세지 보내기 위해서 forward를 사용
		//request.setAttribute("erMsg", erMsg);
		//request.setAttribute("test01", erMsg);
		
		//request.getRequestDispatcher(DEFAULT_FAILURE_URL).forward(request, response);
		
		out.print(erMsg);
		out.flush();
		out.close();
		
	}
	
}