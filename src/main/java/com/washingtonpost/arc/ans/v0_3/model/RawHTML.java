package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * <p>Models raw_html element(s) in an ANS Content object</p>
 */
public class RawHTML extends ContentElement {

    public static final String TYPE = "raw_html";

    @JsonProperty("html")
    private String html;

    public RawHTML() {
        setType(TYPE);
    }
    /**
     * @return The html of the element
     */
    public String getHTML() {
        return html;
    }

    /**
     * @param html The html of the element
     */
    public void setHTML(String html) {
        this.html = html;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(html)
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;

        if (other instanceof RawHTML) {
            RawHTML that = (RawHTML) other;
            result = that.canEqual(this)
                    && new EqualsBuilder()
                    .append(html, that.html)
                    .appendSuper(super.equals(other))
                    .isEquals();
        }
        return result;
    }

    /**
     * See http://www.artima.com/lejava/articles/equality.html for why we're doing this (it's essentially required at all levels
     * of a heirarchy to make the .equals() reflexivity property work.
     *
     * @param other The object we're being compared against
     * @return true, if it's an instanceof this class type
     */
    @Override
    public boolean canEqual(Object other) {
        return (other instanceof RawHTML);
    }

}
