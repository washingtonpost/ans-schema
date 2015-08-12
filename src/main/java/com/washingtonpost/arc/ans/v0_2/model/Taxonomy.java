
package com.washingtonpost.arc.ans.v0_2.model;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * Taxonomy
 * <p>
 * Holds the collection of metadata, keywords, etc that describe content.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "keywords"
})
public class Taxonomy {

    /**
     * A list of keywords.
     * 
     */
    @JsonProperty("keywords")
    private List<Keyword> keywords = new ArrayList<>();

    /**
     * A list of keywords.
     * 
     * @return
     *     The keywords
     */
    @JsonProperty("keywords")
    public List<Keyword> getKeywords() {
        return keywords;
    }

    /**
     * A list of keywords.
     * 
     * @param keywords
     *     The keywords
     */
    @JsonProperty("keywords")
    public void setKeywords(List<Keyword> keywords) {
        this.keywords = keywords;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(keywords).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Taxonomy) == false) {
            return false;
        }
        Taxonomy rhs = ((Taxonomy) other);
        return new EqualsBuilder().append(keywords, rhs.keywords).isEquals();
    }

}
