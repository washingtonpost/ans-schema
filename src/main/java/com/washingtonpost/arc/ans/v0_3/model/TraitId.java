
package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;


/**
 * Globally Unique ID trait
 * <p>
 * Trait that applies a globally unique id.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public interface TraitId {

    /**
     * A globally unique identifier of the content in the ANS repository.
     * (Required)
     * 
     * @return The globally unique ID
     */
    @JsonProperty("_id")
    public String getId();

    /**
     * A globally unique identifier of the content in the ANS repository.
     * (Required)
     * 
     * @param id  The globally unique ID
     */
    @JsonProperty("_id")
    public void setId(String id);

}
