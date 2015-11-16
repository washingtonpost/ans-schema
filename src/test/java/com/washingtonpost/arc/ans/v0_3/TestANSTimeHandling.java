package com.washingtonpost.arc.ans.v0_3;

import com.washingtonpost.arc.ans.v0_3.model.Story;
import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.junit.Before;
import org.junit.Test;

/**
 * <p>Make sure the various time input/output conversions work the way we want.</p>
 */
public class TestANSTimeHandling {

    private Story story;

    @Before
    public void onSetup() {
        story = new Story();
    }

    @Test
    public void testEpochSecondsToString() {
        story.setLastUpdatedDate("1970-01-01T00:00:00Z");
        assertEquals(Instant.EPOCH, story.getLastUpdatedDateAsInstant());

        story.setCreatedDate("1970-01-01T00:00:01Z");
        assertEquals(Instant.EPOCH.plus(1, ChronoUnit.SECONDS), story.getCreatedDateAsInstant());

        story.setPublishDate("1970-01-01T00:01:00Z");
        assertEquals(Instant.EPOCH.plus(1, ChronoUnit.MINUTES), story.getPublishDateAsInstant());
    }

    @Test
    public void testMilliSeconds() {
        story.setLastUpdatedDate("1970-01-01T00:00:00.123Z");
        assertEquals(Instant.EPOCH.plus(123, ChronoUnit.MILLIS), story.getLastUpdatedDateAsInstant());
    }

    @Test(expected=DateTimeParseException.class)
    public void testNoTrailingZ() {
        story.setLastUpdatedDate("1970-01-01T00:00:00.123");
    }

    @Test(expected=DateTimeParseException.class)
    public void testRequiredSeconds() {
        story.setLastUpdatedDate("1970-01-01T00:00Z");
    }

    @Test
    public void testMillisSensitivity() {
        String a = "2015-06-24T09:50:50.52Z";
        String b = "2015-06-24T09:50:50.052Z";

        story.setLastUpdatedDate(a);
        story.setCreatedDate(b);

        assertTrue(story.getLastUpdatedDateAsInstant().isAfter(story.getCreatedDateAsInstant()));
    }
}
