
package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


/**
 * Describes language for an element
 * <p>
 * Encapsulates characteristics defining language, locale, etc.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "language"
})
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
