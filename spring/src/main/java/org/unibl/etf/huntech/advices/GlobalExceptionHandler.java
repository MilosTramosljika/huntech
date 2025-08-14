package org.unibl.etf.huntech.advices;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerMapping;

import org.unibl.etf.huntech.exceptions.HttpException;
import org.unibl.etf.huntech.util.LoggingUtil;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public final ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpServletRequest request) {
        HandlerMethod handlerMethod = getHandlerMethod(request);
        Log log = getLog(handlerMethod);
        log.error("HttpMessageNotReadableException", ex);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpException.class)
    public final ResponseEntity<Object> handleHttpException(HttpException e, HttpServletRequest request) {
        HandlerMethod handlerMethod = getHandlerMethod(request);
        Log log = getLog(handlerMethod);
        log.error(e);
        if (e.getStatus() == null) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(e.getData(), e.getStatus());
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleException(Exception e, HttpServletRequest request) {
        HandlerMethod handlerMethod = getHandlerMethod(request);
        LoggingUtil.logException(e, getLog(handlerMethod));
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private HandlerMethod getHandlerMethod(HttpServletRequest request) {
        Object handler = request.getAttribute(HandlerMapping.BEST_MATCHING_HANDLER_ATTRIBUTE);
        if (handler instanceof HandlerMethod) {
            return (HandlerMethod) handler;
        }
        return null;
    }

    private Log getLog(HandlerMethod handlerMethod) {
        if (handlerMethod != null) {
            return LogFactory.getLog(handlerMethod.getMethod().getDeclaringClass());
        }
        // fallback logger ako nema handlerMethod
        return LogFactory.getLog(GlobalExceptionHandler.class);
    }
}
