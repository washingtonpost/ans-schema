package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * <p>Models a header element(s) in an ANS Content object</p>
 */
public class Header extends ContentElement {

    public static final String TYPE = "header";

    @JsonProperty("text")
    private String text;

    @JsonProperty("level")
    private int level;

    public Header() {
        setType(TYPE);
    }

    /**
     * @return The text of the header
     */
    public String getText() {
        return text;
    }

    /**
     * @param text the text of the header
     */
    public void setText(String text) {
        this.text = text;
    }


    /**
     * @return the level of the header
     */
    public int getLevel() {
        return level;
    }

    /**
     * @param level the level of the header
     */
    public void setLevel(int level) {
        this.level = level;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
            .append(text)
            .append(level)
            .appendSuper(super.hashCode())
            .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;

        if (other instanceof Header) {
            Header that = (Header) other;
            result = that.canEqual(this)
                && new EqualsBuilder()
                .append(text, that.text)
                .append(level, that.level)
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
        return (other instanceof Header);
    }

}
