package com.mochasoft.jsmcc.flowgraph.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mochasoft.jsmcc.flowgraph.entity.Version;
import com.mochasoft.jsmcc.flowgraph.helper.JsonHelper;
import com.mochasoft.jsmcc.flowgraph.service.VersionService;

@Controller
public class GraphController {
	
	@Autowired
	private VersionService versionService;
	
	@RequestMapping(method = RequestMethod.POST, value = "graph")
	@ResponseBody
	public String saveGraph(Model model, @RequestParam("data") String data){
		Version graphVersion = (Version) JsonHelper.fromJson(data, Version.class);
		return "success";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "graph.html")
	public ModelAndView showIndex(){
		System.out.println("do it");
		return new ModelAndView("graph");
	}
}
