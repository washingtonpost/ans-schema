
package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;


/**
 * Globally Unique ID trait
 * <p>
 * Trait that applies a globally unique id.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public interface TraitGuid {

    /**
     * A globally unique identifier of the content in the ANS repository.
     * (Required)
     * 
     * @return
     *     The guid
     */
    @JsonProperty("guid")
    public String getGuid();

    /**
     * A globally unique identifier of the content in the ANS repository.
     * (Required)
     * 
     * @param guid
     *     The guid
     */
    @JsonProperty("guid")
    public void setGuid(String guid);

}
