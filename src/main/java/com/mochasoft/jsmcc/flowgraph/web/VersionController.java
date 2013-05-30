package com.mochasoft.jsmcc.flowgraph.web;

import java.io.IOException;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;

import com.mochasoft.jsmcc.flowgraph.entity.Version;
import com.mochasoft.jsmcc.flowgraph.helper.FileHelper;
import com.mochasoft.jsmcc.flowgraph.service.VersionService;

@Controller
public class VersionController {
	
	public static final Logger logger = Logger.getLogger("flowgraph");
	
	@Autowired
	private VersionService versionService;
	
	@RequestMapping(method = RequestMethod.GET, value = "version/{versionId}")
	@ResponseBody
	public String loadVersion(Model model, @PathVariable long versionId){
		Version version = versionService.select(versionId);
		return version.getDmo();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "version")
	@ResponseBody
	public String saveVersion(Model model, Version version){
		versionService.createVersion(version);
		Version newVersion = versionService.select(version.getId());
		String png = StringUtils.substringAfter(version.getPng(), ",");
		newVersion.setPngBytes(Base64.decodeBase64(png.getBytes()));
		try {
			FileHelper.write(newVersion);
		} catch (IOException e) {
			logger.error("保存图片错误", e);
		}
		return "success";
	}
	
}
