package org.unibl.etf.huntech.exceptions;


import org.springframework.http.HttpStatus;

//401
public class UnauthorizedException extends HttpException {

    public UnauthorizedException(){super(HttpStatus.UNAUTHORIZED, null);}

    public UnauthorizedException(Object data) {super(HttpStatus.UNAUTHORIZED, data);}
}
