package jj.group.portfolio.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Secured("ANONYMOUS")
@Controller
public class LoginController {
	
	// preAuthorize hasRole의 ROLE_xxx부분을 수정하면 안타짐.
	@PreAuthorize("hasRole('ROLE_ANONYMOUS')")
	// @RequestMapping(value="/login", method={ RequestMethod.GET, RequestMethod.POST })
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public ModelAndView loginPage(HttpServletRequest req, Authentication auth) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		String ref = new String();
		ref = req.getHeader("REFERER") != null ?
			req.getHeader("REFERER"):
			"/";
		
		System.out.println("referer ===> " + ref);
		
		
		return mav;
		
	}
	
}
