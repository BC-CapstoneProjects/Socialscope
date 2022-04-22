package com.example.backend;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin
@Controller
public class FrontendController implements ErrorController {
	
	private static final String ERROR_PATH = "/error";
	
	@RequestMapping(value = "/*")
	public String home() {
		return "index";
	}
	
	@RequestMapping(value = ERROR_PATH) 
	public ModelAndView forwardErrorQuery() {
		return new ModelAndView("forward:/");
	}

	
	public String getErrorPath() {
		return ERROR_PATH;
	}
}
