
package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * A media object.
 * <p>
 * Holds common attributes of ANS Media objects.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Media extends Content {

    @JsonProperty("title")
    private String title;

    @JsonProperty("taxonomy")
    private Taxonomy taxonomy;

    /**
     * @return The title of the media object
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title The title of the media object
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return A collection of metadata, keywords, etc. describing this media.
     */
    public Taxonomy getTaxonomy() {
        return taxonomy;
    }

    /**
     * @param taxonomy A collection of metadata, keywords, etc. describing this media.
     */
    public void setTaxonomy(Taxonomy taxonomy) {
        this.taxonomy = taxonomy;
    }


    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }


    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(title)
                .append(taxonomy)
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Media) == false) {
            return false;
        }
        Media rhs = ((Media) other);
        return new EqualsBuilder()
                .append(title, rhs.title)
                .append(taxonomy, rhs.taxonomy)
                .appendSuper(super.equals(other))
                .isEquals();
    }

    @Override
    public boolean canEqual(Object other) {
        return (other instanceof Media);
    }
}
