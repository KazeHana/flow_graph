package com.mochasoft.jsmcc.flowgraph.helper;

import java.lang.reflect.Type;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JsonHelper {
	
	private static Gson gson;
	
	static{
		gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
								.enableComplexMapKeySerialization()
								.serializeNulls()
								.setDateFormat("yyyy-MM-dd HH:mm:ss")
								.create();
	}
	
	public static Object fromJson(String json, Type typeOfT){
		return gson.fromJson(json, typeOfT);
	}
	
	public static String toJson(Object bean){
		return gson.toJson(bean);
	}
}
