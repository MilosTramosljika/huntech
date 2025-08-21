package org.unibl.etf.huntech.models;


import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.UlogaEntity;

import java.time.LocalDate;

@Data
public class KorisnikHasUloga {

    private Integer id;
    private Integer idKorisnika;
    private Integer idUloge;
    private LocalDate datumDobijanjaUloge;
}
