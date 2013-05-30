package com.mochasoft.jsmcc.flowgraph.entity;

import java.util.Date;

public class Version {
	
	private long id;
	private long graph;
	private int code;
	private String description;
	private String creator;
	private Date createAt;
	private long parent;
	private String dmo;
	private Date lastUpdate;
	//helper
	private String png;
	private byte[] pngBytes;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getGraph() {
		return graph;
	}
	public void setGraph(long graph) {
		this.graph = graph;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public Date getCreateAt() {
		return createAt;
	}
	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}
	public long getParent() {
		return parent;
	}
	public void setParent(long parent) {
		this.parent = parent;
	}
	public String getDmo() {
		return dmo;
	}
	public void setDmo(String dmo) {
		this.dmo = dmo;
	}
	public Date getLastUpdate() {
		return lastUpdate;
	}
	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
	public String getPng() {
		return png;
	}
	public void setPng(String png) {
		this.png = png;
	}
	public byte[] getPngBytes() {
		return pngBytes;
	}
	public void setPngBytes(byte[] pngBytes) {
		this.pngBytes = pngBytes;
	}
	
}
