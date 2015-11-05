
package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.format.DateTimeFormatter;

/**
 * Dated trait
 * <p>
 * Trait that applies common publishing-related dates to a schema.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public interface TraitDated {
    public static final DateTimeFormatter RFC3339 = DateTimeFormatter.ISO_INSTANT;
    /**
     * When the content was originally created (RFC3339-formatted).
     * 
     * @return The createdDate
     */
    @JsonProperty("created_date")
    public String getCreatedDate();

    /**
     * When the content was originally created (RFC3339-formatted).
     * 
     * @param createdDate The created_date
     */
    @JsonProperty("created_date")
    public void setCreatedDate(String createdDate);

    /**
     * When the content was last updated (RFC3339-formatted).
     * 
     * @return The lastUpdatedDate
     */
    @JsonProperty("last_updated_date")
    public String getLastUpdatedDate();

    /**
     * When the content was last updated (RFC3339-formatted).
     * 
     * @param lastUpdatedDate The last_updated_date
     */
    @JsonProperty("last_updated_date")
    public void setLastUpdatedDate(String lastUpdatedDate);

}
