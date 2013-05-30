package com.mochasoft.jsmcc.flowgraph.helper;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.time.DateFormatUtils;

import com.mochasoft.jsmcc.flowgraph.entity.Version;

public class FileHelper {
	
	public static Properties props = null;
	static{
		InputStream is = null;
		try {
			is = FileHelper.class.getResourceAsStream("/application.properties");
			props = new Properties();
			props.load(is);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	private static final String basePath =  props.getProperty("data.path") + "/.flowGraph/data";
	
	public static void write(Version version) throws IOException{
		File file = new File(getFileURI(version));
		FileUtils.writeByteArrayToFile(file, version.getPngBytes());
	}
	
	public static void read(Version version) throws IOException{
		File file = new File(getFileURI(version));
		if(!file.exists()){
			return;
		}
		version.setPngBytes(FileUtils.readFileToByteArray(file));
	}
	
	public static String getFileURI(Version version){
		StringBuffer sb = new StringBuffer(basePath);
		sb.append('/').append(DateFormatUtils.format(version.getCreateAt(), "yyyy-MM-dd")).append('/')
		  .append(version.getId()).append(".png");
		return sb.toString();
	}
	
}
