
package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;


/**
 * Copyright information
 * <p>
 * Defines the structure of copyright information, as applied to content.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public interface TraitCopyrighted {

    /**
     * The copyright notice, e.g. '(c) 2015 The Washington Post, Inc.'
     * 
     * @return
     *     The copyright
     */
    @JsonProperty("copyright")
    public String getCopyright();

    /**
     * The copyright notice, e.g. '(c) 2015 The Washington Post, Inc.'
     * 
     * @param copyright
     *     The copyright
     */
    @JsonProperty("copyright")
    public void setCopyright(String copyright);

}
