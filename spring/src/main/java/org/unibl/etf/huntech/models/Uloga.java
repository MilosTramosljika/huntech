package org.unibl.etf.huntech.models;


import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KorisnikHasUlogaEntity;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class Uloga {

    private Integer id;
    private String nazivUloge;
    //private Set<KorisnikHasUlogaEntity> korisnikHasUlogas = new LinkedHashSet<>();

}
