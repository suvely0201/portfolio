package jj.group.portfolio.controller;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Secured("ANONYMOUS")
@Controller
public class LoginController {
	
	// preAuthorize hasRole의 ROLE_xxx부분을 수정하면 안타짐.
	@PreAuthorize("hasRole('ROLE_ANONYMOUS')")
	@RequestMapping(value="/login", method={ RequestMethod.GET, RequestMethod.POST })
	public ModelAndView loginPage() throws Exception {
		System.out.println("login page 여기서 보낼수 있나요?");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		return mav;
		
	}
	
}
