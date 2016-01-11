package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import java.util.Map;

/**
 * <p>Digest of an ANS Story object for quicker fetching/sorting/listing</p>
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public final class StorySummary implements TraitId {

    @JsonProperty("_id")
    private String id;

    @JsonProperty("last_updated_date")
    private String lastUpdatedDate;

    @JsonProperty("canonical_url")
    private String canonicalUrl;

    @JsonProperty("headlines")
    private Map<String, String> headlines;

    @JsonProperty("credits")
    private List<Credit> credits;

    public StorySummary() {
    }

    public static StorySummary fromStory(Story story) {
        StorySummary summary = new StorySummary();
        summary.setId(story.getId());
        summary.setCanonicalUrl(story.getCanonicalUrl());
        summary.setLastUpdatedDate(story.getLastUpdatedDate());
        if (story.getCredits() != null) {
            summary.setCredits(new ArrayList<>(story.getCredits()));
        }
        if (story.getHeadlines() != null) {
            summary.setHeadlines(story.getHeadlines());
        }
        return summary;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public String getLastUpdatedDate() {
        return lastUpdatedDate;
    }

    public void setLastUpdatedDate(String lastUpdatedDate) {
        this.lastUpdatedDate = lastUpdatedDate;
    }

    public String getCanonicalUrl() {
        return canonicalUrl;
    }

    public void setCanonicalUrl(String canonicalUrl) {
        this.canonicalUrl = canonicalUrl;
    }

    public Map<String, String> getHeadlines() {
        return headlines;
    }

    public void setHeadlines(Map<String, String> headlines) {
        this.headlines = headlines;
    }

    public List<Credit> getCredits() {
        return credits;
    }

    public void setCredits(List<Credit> credits) {
        this.credits = credits;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(this.canonicalUrl)
                .append(this.credits)
                .append(this.headlines)
                .append(this.id)
                .append(this.lastUpdatedDate)
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if (!(other instanceof StorySummary)) {
            return false;
        }
        StorySummary that = ((StorySummary) other);
        return that.canEqual(this)
                && new EqualsBuilder()
                .append(this.canonicalUrl, that.canonicalUrl)
                .append(this.credits, that.credits)
                .append(this.headlines, that.headlines)
                .append(this.id, that.id)
                .append(this.lastUpdatedDate, that.lastUpdatedDate)
                .isEquals();
    }

    public boolean canEqual(Object other) {
        return (other instanceof StorySummary);
    }
}
