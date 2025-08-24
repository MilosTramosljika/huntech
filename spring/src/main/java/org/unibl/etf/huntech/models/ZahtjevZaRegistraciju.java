package org.unibl.etf.huntech.models;


import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KHasZarEntity;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class ZahtjevZaRegistraciju {

    private Integer id;
    private String urlPdfDokumenta;
    //private Set<KHasZarEntity> kHasZars = new LinkedHashSet<>();
}
