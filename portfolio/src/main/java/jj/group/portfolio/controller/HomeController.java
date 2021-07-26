package jj.group.portfolio.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	public ModelAndView home(HttpServletRequest req) throws Exception {
		
		System.out.println("???????");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		return mav;
		
	}
	
	@RequestMapping(value="/display", method=RequestMethod.GET)
	public ModelAndView display() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		return mav;
		
	}
	
}
