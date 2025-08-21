package org.unibl.etf.huntech.models.requests;

import lombok.Data;
import org.unibl.etf.huntech.models.entities.GrupaEntity;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;

import java.time.LocalDate;

@Data
public class ObjavaRequest {
    private Integer id;
    private Integer idGrupe;
    private Integer idKorisnika;
    private String tipObjave;
    private LocalDate datumObjavljivanja;
    private Integer lajk;
    private Integer dislajk;
    private String sadrzaj;
}
