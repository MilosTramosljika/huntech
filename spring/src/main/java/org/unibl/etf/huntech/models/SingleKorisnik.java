package org.unibl.etf.huntech.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class SingleKorisnik extends Korisnik {
    private List<Prijava> prijave;
    private List<Obavjestenja> obavjestenja;
}