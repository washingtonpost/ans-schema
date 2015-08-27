
package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * Keyword
 * <p>
 * Models a keyword used in describing a piece of content.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Keyword {

    /**
     * The keyword used to describe/categorize a piece of content
     * (Required)
     * 
     */
    @JsonProperty("keyword")
    private String keyword;
    /**
     * An arbitrary weighting to give the keyword
     * 
     */
    @JsonProperty("score")
    private Double score;
    /**
     * An optional count of the frequency of the keyword as it appears in the content it describes
     * 
     */
    @JsonProperty("frequency")
    private Integer frequency;

    /**
     * The keyword used to describe/categorize a piece of content
     * (Required)
     * 
     * @return
     *     The keyword
     */
    @JsonProperty("keyword")
    public String getKeyword() {
        return keyword;
    }

    /**
     * The keyword used to describe/categorize a piece of content
     * (Required)
     * 
     * @param keyword
     *     The keyword
     */
    @JsonProperty("keyword")
    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    /**
     * An arbitrary weighting to give the keyword
     * 
     * @return
     *     The score
     */
    @JsonProperty("score")
    public Double getScore() {
        return score;
    }

    /**
     * An arbitrary weighting to give the keyword
     * 
     * @param score
     *     The score
     */
    @JsonProperty("score")
    public void setScore(Double score) {
        this.score = score;
    }

    /**
     * An optional count of the frequency of the keyword as it appears in the content it describes
     * 
     * @return
     *     The frequency
     */
    @JsonProperty("frequency")
    public Integer getFrequency() {
        return frequency;
    }

    /**
     * An optional count of the frequency of the keyword as it appears in the content it describes
     * 
     * @param frequency
     *     The frequency
     */
    @JsonProperty("frequency")
    public void setFrequency(Integer frequency) {
        this.frequency = frequency;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(keyword)
                .append(score)
                .append(frequency)
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Keyword) == false) {
            return false;
        }
        Keyword rhs = ((Keyword) other);
        return new EqualsBuilder()
                .append(keyword, rhs.keyword)
                .append(score, rhs.score)
                .append(frequency, rhs.frequency)
                .isEquals();
    }

}
