package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.huntech.models.entities.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class Dogadjaj {
    private Integer id;
    private String lokacija;
    private String vrstaDivljaci;
    private String koristenoOruzje;
    private Integer idObjaveNaLD;
}
