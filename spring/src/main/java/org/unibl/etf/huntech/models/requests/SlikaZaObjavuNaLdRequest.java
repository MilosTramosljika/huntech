package org.unibl.etf.huntech.models.requests;


import lombok.Data;

import java.time.Instant;

@Data
public class SlikaZaObjavuNaLdRequest {
    private Integer id;
    private Instant datum;
    private String slika;
    private Integer idObjaveNaLD;
}
