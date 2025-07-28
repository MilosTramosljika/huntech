package org.unibl.etf.huntech.znzm;


import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.huntech.models.Poruka;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class SinglePoruka extends Poruka {

    private List<Poruka> pourkas;

}
