package org.unibl.etf.huntech.models.requests;

import lombok.Data;

@Data
public class DogadjajRequest {
    private Integer id;
    private String lokacija;
    private String vrstaDivljaci;
    private String koristenoOruzje;
    private Integer idObjaveNaLD;
}
