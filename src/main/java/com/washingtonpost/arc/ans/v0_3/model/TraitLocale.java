
package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;


/**
 * Describes language for an element
 * <p>
 * Encapsulates characteristics defining language, locale, etc.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public interface TraitLocale {

    /**
     * The primary language of the content. The value should follow IETF BCP47. (e.g. 'en', 'es-419', etc.) 
     * 
     * @return
     *     The language
     */
    @JsonProperty("language")
    public String getLanguage();

    /**
     * The primary language of the content. The value should follow IETF BCP47. (e.g. 'en', 'es-419', etc.) 
     * 
     * @param language
     *     The language
     */
    @JsonProperty("language")
    public void setLanguage(String language);
}
