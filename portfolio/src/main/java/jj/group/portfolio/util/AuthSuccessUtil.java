package jj.group.portfolio.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;

public class AuthSuccessUtil extends SavedRequestAwareAuthenticationSuccessHandler {
	
	private RequestCache requestCache = new HttpSessionRequestCache();
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		
		String erMsg = new String();
		
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String referer = "/";
		
		erMsg = 
				StringUtils.join(new String[] {
						"{\"_auth_\": {",
							"\"_authCode\":\"auth_01\",",
							"\"_redirectUrl\":\"" + referer + "\"",
						"}}"
				});
		
		out.print(erMsg);
		out.flush();
		out.close();
		
		// requestCache에 발생
		// 로그인 - 다른 페이지 접속 - 로그아웃 - 다른 페이지 접속 - 로그인
		// 위 알고리즘 등으로 로그인을 시도했을 때 하나의 reuqest에 response를 여러번 할 수 없다는 에러가 발생함.
		// onAuthenticationSuccess를 ctrl + 클릭했을 때 나오는 class파일에서 sendRedirect발견
		// targetUrl을 requestCache에 req, res 넣고 가져오는 현상 확인
		// 초기화 해서 해결.
		// 해당 방식은 logout에서 해줘도 되지만, 첫 로그인을 진행할 때에도 가끔 다중 response에러가 떨어지는 현상 때문에 login에 추가함.
		requestCache.removeRequest(request, response);
		super.onAuthenticationSuccess(request, response, authentication);
		
	}
	
}
