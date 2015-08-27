
package com.washingtonpost.arc.ans.v0_3.model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;


/**
 * Credit trait
 * <p>
 * Trait that captures the need to attribute ownership or authorship to content.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public interface TraitCredited {

    /**
     * A list of people/groups attributed to this content.
     * (Required)
     * 
     * @return
     *     The credits
     */
    @JsonProperty("credits")
    public List<Credit> getCredits();

    /**
     * A list of people/groups attributed to this content.
     * (Required)
     * 
     * @param credits
     *     The credits
     */
    @JsonProperty("credits")
    public void setCredits(List<Credit> credits);
}
