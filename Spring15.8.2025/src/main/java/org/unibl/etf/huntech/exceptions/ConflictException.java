package org.unibl.etf.huntech.exceptions;

import org.springframework.http.HttpStatus;

public class ConflictException extends HttpException {
    //409
    //Kada pokusamo duplirati jedinstveni entitet
    //dodati unos sa istim nazivom, server vraca 409
    public ConflictException() {super(HttpStatus.CONFLICT, null);}

    public ConflictException(Object data) {super(HttpStatus.CONFLICT, data);}


}
