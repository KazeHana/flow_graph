package com.mochasoft.jsmcc.flowgraph;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.io.InputStream;

import org.junit.Test;

import com.mochasoft.jsmcc.flowgraph.helper.FileHelper;

public class AppTest {
	
	@Test
    public void testApp(){
       assertEquals("d://", FileHelper.props.getProperty("data.path"));
    }
	
	@Test
	public void testPath(){
		InputStream is=FileHelper.class.getResourceAsStream("/application.properties");
		try {
			System.out.println(is.available());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
