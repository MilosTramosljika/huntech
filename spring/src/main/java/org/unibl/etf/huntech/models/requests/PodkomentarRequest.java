package org.unibl.etf.huntech.models.requests;


import lombok.Data;

@Data
public class PodkomentarRequest {
    private Integer id;
    private String sadrzaj;
    private Integer idKomentara;

}
