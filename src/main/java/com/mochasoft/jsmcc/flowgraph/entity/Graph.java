package com.mochasoft.jsmcc.flowgraph.entity;

import java.util.Date;

public class Graph {
	
	private long id;
	private long project;
	private String name;
	private Date createAt;
	private String creator;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getProject() {
		return project;
	}
	public void setProject(long project) {
		this.project = project;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreateAt() {
		return createAt;
	}
	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	
}
