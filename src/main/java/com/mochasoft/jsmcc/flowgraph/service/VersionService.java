package com.mochasoft.jsmcc.flowgraph.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mochasoft.jsmcc.flowgraph.dao.VersionDao;
import com.mochasoft.jsmcc.flowgraph.entity.Version;

@Service
public class VersionService {
	
	@Autowired
	private VersionDao versionDao;
	
	public long createVersion(Version version){
		version.setCode(versionDao.selectMaxCode(version.getGraph()));
		return versionDao.insert(version);
	}
	
	public void modifyVersion(Version version){
		versionDao.update(version);
	}
	
	public void removeVersion(long id){
		versionDao.delete(id);
	}
	
	public Version select(long versionId){
		return versionDao.select(versionId);
	}
	
	public List<Version> selectByGraphId(long graphId){
		return versionDao.selectByGraphId(graphId);
	}
}
