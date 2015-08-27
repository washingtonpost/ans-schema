
package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;


/**
 * Trait that helps support strongly-typed implementations of this schema.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public interface TraitTyped {

    /**
     * A concrete type to helps support strongly-typed implementations of this schema.
     * (Required)
     * 
     * @return The type of the element
     */
    @JsonProperty("type")
    public String getType();

    /**
     * A concrete type to helps support strongly-typed implementations of this schema.
     * (Required)
     * 
     * @param type  The type
     */
    @JsonProperty("type")
    public void setType(String type);

}
