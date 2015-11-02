package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * <p>Models raw_html element(s) in an ANS Content object</p>
 */
public class Blockquote extends ANS {

    public static final String TYPE = "blockquote";

    @JsonProperty("content")
    private String content;

    public Blockquote() {
        setType(TYPE);
    }
    /**
     * @return The content of the element
     */
    public String getContent() {
        return content;
    }

    /**
     * @param content The content of the element
     */
    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(content)
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;

        if (other instanceof Blockquote) {
            Blockquote that = (Blockquote) other;
            result = that.canEqual(this)
                    && new EqualsBuilder()
                    .append(content, that.content)
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
        return (other instanceof Blockquote);
    }

}
