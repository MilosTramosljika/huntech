package org.unibl.etf.huntech.models.requests;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.GrupaEntity;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ObjavaRequest {
    private Integer id;
    private Integer idGrupe;
    private Integer idKorisnika;
    private String tipObjave;
    private LocalDateTime datumObjavljivanja;
    private Integer lajk;
    private Integer dislajk;
    private String sadrzaj;
    private String nazivObjave;
}
