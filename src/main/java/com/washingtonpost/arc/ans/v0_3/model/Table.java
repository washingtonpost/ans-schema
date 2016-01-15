package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import java.util.List;

/**
 * <p>Models a text element(s) in an ANS Content object</p>
 */
public class Table extends ContentElement {

    public static final String TYPE = "table";

    @JsonProperty("header")
    private List<Text> header;

    @JsonProperty("rows")
    private List<List<Text>> rows;

    public Table() {
        setType(TYPE);
    }

    /**
     * @return an List of header cells
     */
    public List<Text> getHeader() {
        return header;
    }

    /**
     * @param header an List of header cells
     */
    public void setHeader(List<Text> header) {
        this.header = header;
    }

    /**
     * @return a two-dimension List of cells
     */
    public List<List<Text>> getRows() {
        return rows;
    }

    /**
     * @param rows a two-dimensional List of cells
     */
    public void setRows(List<List<Text>> rows) {
        this.rows = rows;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
            .append(header)
            .append(rows)
            .appendSuper(super.hashCode())
            .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;

        if (other instanceof Table) {
            Table that = (Table) other;
            result = that.canEqual(this)
                && new EqualsBuilder()
                .append(header, that.header)
                .append(rows, that.rows)
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
        return (other instanceof Table);
    }

}
