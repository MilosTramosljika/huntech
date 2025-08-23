package org.unibl.etf.huntech.models.requests;

import lombok.Data;

import java.time.Instant;

@Data
public class ObjavaNaLovackiDnevnikRequest {
    private Integer id;
    private Instant datum;
    private String sadrzaj;
    private Integer idKorisnika;
}
