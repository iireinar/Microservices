package br.com.noface.sso.entity;

import java.util.Calendar;

public class Session {

    private String _id;
    private String token;
    private String username;
    private Calendar expiration;
    private Integer __v;
    
    
    public String get_id() {return _id;}
    public void set_id(String _id) {this._id = _id;}
    
    public String getToken() {return token;}
    public void setToken(String token) {this.token = token;}
    
    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}
    
    public Calendar getExpiration() {return expiration;}
    public void setExpiration(Calendar expiration) {this.expiration = expiration;}
    
    public Integer get__v() {return __v;}
    public void set__v(Integer __v) {this.__v = __v;}
    
}
