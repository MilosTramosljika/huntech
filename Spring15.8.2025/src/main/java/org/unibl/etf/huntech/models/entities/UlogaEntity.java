package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.huntech.base.BaseEntity;
import org.unibl.etf.huntech.models.enums.NazivUloge;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "uloga")
public class UlogaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdUloge", nullable = false)
    private Integer id;

    //@Lob
    @Enumerated(EnumType.STRING)
    @Column(name = "NazivUloge", nullable = false)
    private NazivUloge nazivUloge;

    @OneToMany(mappedBy = "idUloge")
    @JsonIgnore
    private Set<KorisnikHasUlogaEntity> korisnikHasUlogas = new LinkedHashSet<>();

}