package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * <p>Models a code sample element</p>
 */
public class Code extends ContentElement {

    public static final String TYPE = "code";

    @JsonProperty("code")
    private String code;

    @JsonProperty("language")
    private String language;

    public Code() {
        setType(TYPE);
    }
    /**
     * @return The code sample
     */
    public String getCode() {
        return code;
    }

    /**
     * @return The programming or markup language of the code sample
     */
    public String getLanguage() {
        return language;
    }

    /**
     * @param code The code of the element
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * @param language The programming language of the code sample
     */
    public void setLanguage(String language) {
        this.language = language;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
            .append(code)
            .append(language)
            .appendSuper(super.hashCode())
            .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;

        if (other instanceof Code) {
            Code that = (Code) other;
            result = that.canEqual(this)
                && new EqualsBuilder()
                .append(code, that.code)
                .append(language, that.language)
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
        return (other instanceof Code);
    }

}
